#!/usr/bin/env python3
import sys
import json
import numpy as np

try:
    from sklearn.linear_model import SGDClassifier
    from sklearn.metrics import log_loss, accuracy_score
except Exception as e:
    sys.stderr.write(json.dumps({"error": f"Missing Python packages: {e}. Install scikit-learn and numpy."}))
    sys.exit(2)


def probs_from_model(clf, X):
    # Use decision_function then sigmoid/softmax to compute probabilities
    scores = clf.decision_function(X)
    if scores.ndim == 1:
        # binary
        probs_pos = 1.0 / (1.0 + np.exp(-scores))
        probs = np.vstack([1 - probs_pos, probs_pos]).T
    else:
        # multiclass: softmax
        exp = np.exp(scores - np.max(scores, axis=1, keepdims=True))
        probs = exp / np.sum(exp, axis=1, keepdims=True)
    return probs


def main():
    if len(sys.argv) < 2:
        sys.stderr.write(json.dumps({"error": "Usage: train_model.py <input_json_path>"}))
        sys.exit(2)

    path = sys.argv[1]
    try:
        with open(path, 'r') as f:
            data = json.load(f)
    except Exception as e:
        sys.stderr.write(json.dumps({"error": f"Failed to read input JSON: {e}"}))
        sys.exit(2)

    X_train = np.array(data.get('X_train', []), dtype=float)
    y_train = np.array(data.get('y_train', []), dtype=float)
    X_test = np.array(data.get('X_test', []), dtype=float)
    y_test = np.array(data.get('y_test', []), dtype=float)
    num_epochs = int(data.get('numEpochs', 10))
    learning_rate = float(data.get('learningRate', 0.01))

    if X_train.size == 0 or y_train.size == 0:
        sys.stderr.write(json.dumps({"error": "Empty training data."}))
        sys.exit(2)

    # Ensure y is integer labels for classifiers
    y_train = y_train.astype(int)
    y_test = y_test.astype(int) if y_test.size > 0 else np.array([])

    classes = np.unique(y_train)

    clf = SGDClassifier(
        loss='log',
        learning_rate='constant',
        eta0=learning_rate,
        max_iter=1,
        tol=None,
        shuffle=True,
        random_state=0,
    )

    loss_history = []

    # Use partial_fit to emulate epochs
    for epoch in range(num_epochs):
        if epoch == 0:
            clf.partial_fit(X_train, y_train, classes=classes)
        else:
            clf.partial_fit(X_train, y_train)

        try:
            probs = probs_from_model(clf, X_train)
            l = float(log_loss(y_train, probs, labels=classes))
        except Exception:
            # fallback to binary manual loss if needed
            try:
                probs_pos = 1.0 / (1.0 + np.exp(-clf.decision_function(X_train)))
                eps = 1e-7
                probs_pos = np.clip(probs_pos, eps, 1 - eps)
                l = float(-np.mean(y_train * np.log(probs_pos) + (1 - y_train) * np.log(1 - probs_pos)))
            except Exception as e:
                l = 0.0
        loss_history.append(l)

    if X_test.size > 0 and y_test.size > 0:
        y_pred = clf.predict(X_test)
        accuracy = float(accuracy_score(y_test, y_pred))
    else:
        accuracy = 0.0

    weights = clf.coef_.ravel().tolist() if hasattr(clf, 'coef_') else []
    intercept = clf.intercept_.tolist() if hasattr(clf, 'intercept_') else []

    result = {
        'lossHistory': loss_history,
        'accuracy': accuracy,
        'weights': weights,
        'intercept': intercept,
    }

    sys.stdout.write(json.dumps(result))


if __name__ == '__main__':
    main()
