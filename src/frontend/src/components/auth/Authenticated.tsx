import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../utils/auth";

export function Authenticated(props: React.PropsWithChildren) {
    const { children } = props;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = getCurrentUser();

    useEffect(() => {
        if (user?.email) {
            setIsAuthenticated(true);
        }
    }, [user])

    return <Box>
        {isAuthenticated && children}
    </Box>
}