import moment from 'moment'
import React from 'react'
import { Progress } from 'reactstrap'

const TimelineProgress = ({ day, attendance }) => {
    return (
        <Progress multi className="my-3" style={{ height: '7px' }}>
            {attendance[day] &&
                attendance[day].timeline.length > 0 &&
                attendance[day].timeline.map((a, i) => (
                    <Progress
                        bar
                        animated
                        key={i}
                        id={`id` + moment(a.date).unix()}
                        color={a.idle ? 'light' : 'success'}
                        min={a.start ?? 0}
                        max={attendance[day].duration ?? 0}
                        value={a.duration}
                    />
                ))}
        </Progress>
    )
}

export default TimelineProgress
