import React from 'react'

const Placeholder = ({ message }) => {
    const style = {
        backgroundColor: '#f1f5f9',
        borderRadius: '6px',
        border: '2px dashed #cbd5e1',
        padding: '8px',
        textAlign: 'center',
        color: '#94a3b8',
        fontWeight: 'bold',
    }
    return <div style={style}>{message ?? 'No data'}</div>
}

export default Placeholder
