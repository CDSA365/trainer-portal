import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'
import Emoji from './emoji'

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([])

    const getAnnoucement = () => {
        axios
            .get(config.api.getAnnouncement + `/trainer`)
            .then(({ data }) => setAnnouncements(data))
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getAnnoucement()
    }, [])

    return (
        <div>
            {announcements.map((announcement, key) => (
                <div
                    className="greeting px-2 py-2 rounded text-xl mb-4"
                    style={{ backgroundColor: '#c7d2fe' }}
                    key={key}
                >
                    <p className="font-normal mb-0 text-lg">
                        <Emoji symbol="📢" label="hi!" /> {announcement.message}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Announcements
