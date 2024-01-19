/* eslint-disable no-empty-pattern */
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../store/atoms/user.js";
import { userEmailState } from "../store/selectors/userEmail";

function Appbar({ }) {
    const navigate = useNavigate();
    const userLoading = useRecoilValue(isUserLoading);
    const userEmail = useRecoilValue(userEmailState);
    const setUser = useSetRecoilState(userState);

    if (userLoading) {
        return <></>;
    }

    const commonStyles = {
        display: "flex",
        justifyContent: "space-between",
        zIndex: 1,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        
    };

    if (userEmail) {
        return (
            <div style={{ ...commonStyles, padding: 10 }}>
                <div
                    style={{ marginLeft: 10, cursor: "pointer" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <Typography variant={"h6"}>Pixelloom</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10, display: "flex" }}>
                        <div style={{ marginRight: 10 }}>
                            <Button
                                onClick={() => {
                                    navigate("/addcourse");
                                }}
                            >
                                Add Image
                            </Button>
                        </div>

                        <div style={{ marginRight: 10 }}>
                            <Button
                                onClick={() => {
                                    navigate("/courses");
                                }}
                            >
                                Images
                            </Button>
                        </div>

                        <Button
                            variant={"contained"}
                            onClick={() => {
                                localStorage.setItem("token", null);
                                setUser({
                                    isLoading: false,
                                    userEmail: null,
                                });
                                navigate('/');
                            }}
                        >
                            Logout
                        </Button>

                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div style={{ ...commonStyles, padding: 10 }}>
                <div
                    style={{ marginLeft: 0, cursor: "pointer" }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <Typography variant={"h6"}>Pixelloom</Typography>
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: 10 }}>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Signup
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                navigate("/signin");
                            }}
                        >
                            Signin
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Appbar;
