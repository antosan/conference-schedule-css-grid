import React from "react";
import "./App.css";

const schedule = [
    {
        session: 1,
        timeFrom: "08:00",
        timeTo: "09:00",
        tracks: [1],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 2,
        timeFrom: "08:00",
        timeTo: "08:30",
        tracks: [2],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 3,
        timeFrom: "08:00",
        timeTo: "08:30",
        tracks: [3],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 4,
        timeFrom: "08:00",
        timeTo: "10:00",
        tracks: [4],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 5,
        timeFrom: "08:30",
        timeTo: "10:00",
        tracks: [3],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 6,
        timeFrom: "09:00",
        timeTo: "10:00",
        tracks: [1, 2],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 7,
        timeFrom: "10:00",
        timeTo: "10:30",
        tracks: [1, 2, 3, 4], // all
        sessionTitle: "Take a break!",
        presenter: ""
    },
    {
        session: 8,
        timeFrom: "10:30",
        timeTo: "11:30",
        tracks: [1],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 9,
        timeFrom: "10:30",
        timeTo: "11:00",
        tracks: [2, 3],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 10,
        timeFrom: "10:30",
        timeTo: "11:00",
        tracks: [4],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 11,
        timeFrom: "11:00",
        timeTo: "12:00",
        tracks: [2],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    },
    {
        session: 12,
        timeFrom: "11:00",
        timeTo: "12:00",
        tracks: [3],
        sessionTitle: "Talk Title",
        presenter: "Presenter"
    }
];
const tracks = [...new Set(schedule.flatMap(s => s.tracks))].sort();
const timeSlots = [...new Set(schedule.map(s => s.timeFrom))].sort();

function renderTracks() {
    return tracks.map(t => (
        <span
            key={`track-${t}`}
            className="track-slot"
            aria-hidden="true"
            style={{ gridColumn: `track-${t}`, gridRow: "tracks" }}
        >
            Track {t}
        </span>
    ));
}

function renderTimeSlots() {
    return timeSlots.map(ts => (
        <h2
            key={`time-slot-${ts}`}
            className="time-slot"
            style={{ gridRow: `time-${ts.replace(":", "")}` }}
        >
            {ts}
        </h2>
    ));
}

function getTrackGridColumn(tracks) {
    if (tracks.length === 1) {
        return `track-${tracks[0]}`;
    }

    const startTrack = tracks.sort()[0];
    const endTrack = tracks.sort()[tracks.length - 1];

    return `track-${startTrack}-start / track-${endTrack}-end`;
}

function renderSessions() {
    return schedule.map(s => {
        const allTracks = tracks.length === s.tracks.length;
        const sessionClassName = allTracks
            ? "session track-all"
            : `session track-${s.tracks[0]}`;

        return (
            <div
                key={`session-${s.session}`}
                className={sessionClassName}
                style={{
                    gridColumn: getTrackGridColumn(s.tracks),
                    gridRow: `time-${s.timeFrom.replace(
                        ":",
                        ""
                    )} / time-${s.timeTo.replace(":", "")}`
                }}
            >
                <h3 className="session-title">{s.sessionTitle}</h3>
                {!allTracks && (
                    <React.Fragment>
                        <span className="session-time">{`${s.timeFrom} - ${
                            s.timeTo
                        }`}</span>
                        <span className="session-track">
                            Track: {s.tracks.join(", ")}
                        </span>
                        <span className="session-presenter">{s.presenter}</span>
                    </React.Fragment>
                )}
            </div>
        );
    });
}

function App() {
    return (
        <div>
            <h2 id="schedule-heading">Conference Schedule</h2>
            <div className="schedule" aria-labelledby="schedule-heading">
                {renderTracks()}
                {renderTimeSlots()}
                {renderSessions()}
            </div>
        </div>
    );
}

export default App;
