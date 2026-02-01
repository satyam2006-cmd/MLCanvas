import { Metadata } from "next";
import LabClientPage from "./page-client";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function LabPage() {
    return <LabClientPage />;
}
