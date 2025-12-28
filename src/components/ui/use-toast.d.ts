declare module '@/components/ui/use-toast' {
  import { ToastActionElement } from '@/components/ui/toast';
  
  export type { ToastActionElement };
  
  export interface ToastProps {
    id: string;
    title?: string;
    description?: string;
    variant?: 'default' | 'destructive';
    action?: React.ReactElement<ToastActionElement>;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
  
  export function useToast(): {
    toasts: ToastProps[];
    toast: (props: Omit<ToastProps, 'id' | 'open' | 'onOpenChange'>) => {
      id: string;
      dismiss: () => void;
      update: (props: ToastProps) => void;
    };
    dismiss: (toastId?: string) => void;
  };
  
  export function toast(props: Omit<ToastProps, 'id' | 'open' | 'onOpenChange'>): {
    id: string;
    dismiss: () => void;
    update: (props: ToastProps) => void;
  };
}
