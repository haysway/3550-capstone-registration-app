import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../utils/firebase";
import { useState, useEffect } from "react";
import styles from "./CourseForm.module.css"
import useHttp from "../hooks/useHttp";

export default function InstructorForm() {
    const navigate = useNavigate();

    //useHTTP hook
    const { isLoading, error, sendRequest } = useHttp();

    // Class Information
    const userId = localStorage.getItem("userId");
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [number, setNumber] = useState("");
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("")
    const [seats, setSeats] = useState("")
    const [credits, setCredits] = useState("");

    // Use Instructor Name
    const [instructor, setInstructor] = useState("");

    // Fetch instructor information
    useEffect(() => {
        async function fetchInstructor() {
            const token = localStorage.getItem("token");

            await sendRequest( `${DATABASE_URL}/users/${userId}.json?auth=${token}`, {},
                (userData) => { setInstructor(`${userData.firstName} ${userData.lastName}`)}
            );
        }

        fetchInstructor();
    }, [sendRequest]);

    // Update days
    function handleDayChange(day) {
        setDays((currentDays) =>
            currentDays.includes(day) ? currentDays.filter((d) => d !== day) // remove existing day
                : [...currentDays, day] // add new day
        );
    }

    // Handles the form submission
    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");

        // Save course data into object
        const courseData = {
            instructorID: userId,
            title,
            department,
            number,
            days,
            startTime,
            endTime,
            instructor,
            location,
            occupiedSeats: 0,
            seats: Number(seats),
            credits: Number(credits),
            description,
            students: [],
        };

        console.log("Course being submitted:", courseData);

        // useHttp hook callball and navigate to courses
        await sendRequest(`${DATABASE_URL}/courses.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: courseData,
            },
            () => {
                navigate("/instructor");
            }
        );
    }

    // Form
    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>

            <div className={styles.formHeader}>
                <h2>[ Add New Course ]</h2>
                <p>[ Fill out the details below to publish a new course to the catalog ]</p>
            </div>

            {error && <p className="error">{error}</p>}

            <div className={styles.formControl}>
                <div className={styles.formGrid}>
                    
                    <div className={`${styles.formField} ${styles.titleInput}`}>
                        <label>[Course Title]</label>
                        <input
                            type="text"
                            placeholder="Intro to ..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <label>[Department]</label>
                        <input
                            type="text"
                            placeholder="CS/MATH/ENGL/ENG"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value.toUpperCase())}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <label>[Course Number]</label>
                        <input
                            type="number"
                            placeholder="2420/3230/1010"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <label>[Start Time]</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <label>[End Time]</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <label>[Location]</label>
                        <input
                            type="text"
                            placeholder="Norda R304"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formField}>
                        <label>[Available Seats]</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="1-300"
                            value={seats}
                            onChange={(e) => setSeats(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formField}>
                        <label>[Credits]</label>
                        <input
                            type="number"
                            min="1"
                            placeholder="0-4"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className={styles.formField}>
                    <label>[Days]</label>
                    <div className={styles.daysContainer} >
                        {[
                            { value: "M", label: "Monday" },
                            { value: "T", label: "Tuesday" },
                            { value: "W", label: "Wednesday" },
                            { value: "TH", label: "Thursday" },
                            { value: "F", label: "Friday" },
                        ].map((day) => (
                            <label key={day.value}>
                                <input
                                    type="checkbox"
                                    checked={days.includes(day.value)}
                                    onChange={() => handleDayChange(day.value)}
                                />
                                {day.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div className={styles.formField}>
                    <label>[Description]</label>
                    <textarea
                        placeholder="Provide a detailed description of the course syllabus..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        required
                    />
                </div>

                <input
                    type="hidden"
                    name="instructor"
                    value={instructor}
                />

                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.cancelButton} onClick={() => navigate("/instructor")}>
                        Cancel
                    </button>

                    <button type="submit" className={styles.publishButton} disabled={isLoading}>
                        {isLoading ? "Publishing Course..." : "Publish Course"}
                    </button>
                </div>
                
            </div>
        </form>
    );
}