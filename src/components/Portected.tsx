import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";

export default function Protected({ children,authentication=true }: { children: React.ReactNode,authentication:boolean }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state: RootState) => state.auth.status);
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login');
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);
    return loader? <Loader2 className="w-10 h-10 animate-spin"/>:<>{children}</>
}