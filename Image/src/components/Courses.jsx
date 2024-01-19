/* eslint-disable react/prop-types */
import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import axios from "axios";
import Appbar from "./Appbar.jsx";
import '../yo.css';
// import InitUser from "./InitUser.jsx";

function Courses() {
    const [courses, setCourses] = useState([]);

    const init = async () => {
        const response = await axios.get(`${BASE_URL}/admin/courses/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCourses(response.data.courses)
    }

    useEffect(() => {
        init();
    }, []);

    return (<> <Appbar />  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {courses.map(course => {
            return <Course key={course._id} course={course} />
        }
        )}
    </div></>
    )
}
export function Course({ course }) {
    const navigate = useNavigate();
    const [clickCount, setClickCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewClick = () => {
        setClickCount((prevCount) => prevCount + 1);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Card
            style={{
                margin: 10,
                width: 300,
                minHeight: 200,
                padding: 20,
            }}
        >
            <Typography textAlign={"center"} variant="h5">
                {course.title}
            </Typography>
            <Typography textAlign={"center"} variant="subtitle1">
                {course.description}
            </Typography>
            <img src={course.imageLink} style={{ width: 300 }} alt={course.title} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => {
                        navigate("/course/" + course._id);
                    }}
                >
                    Edit
                </Button>
                <div style={{ marginLeft: 10, position: "relative" }}>
                    <Button variant="contained" size="large" onClick={handleViewClick}>
                        View
                    </Button>
                    <div
                        style={{
                            position: "absolute",
                            top: -15,
                            right: -15,
                            backgroundColor: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: 25,
                            height: 25,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {clickCount}
                    </div>
                </div>
            </div>

            {/* Modal for displaying click count */}
            {isModalOpen && (
        <div className="modal modal-open">
          <div className="overlay"></div>
          <div
            className="modal-container"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: "20px",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="h6" textAlign="center">
              View Count: {clickCount}
            </Typography>
            <Button variant="contained" onClick={handleCloseModal} style={{ marginTop: "10px" }}>
              Close
            </Button>
          </div>
        </div>
      )}
        </Card>
    );
}

/*  this component is meant to display information about a course, including its title, description, and image. 
It also provides an "Edit" button that, when clicked, allows the user to navigate to a page where they can edit the details of the course.  */

export default Courses;




