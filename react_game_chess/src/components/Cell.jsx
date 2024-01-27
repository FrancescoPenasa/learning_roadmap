/* eslint-disable react/prop-types */
export default function Cell({ color, value, handleClick }) {
    if (color) {
        return <div className="cell" style={{
            backgroundColor: '#ffcf9f'
        }} onClick={handleClick}>
            {value}
        </div >
    } else {
        return <div className="cell" style={{
            backgroundColor: '#d28c45'
        }} onClick={handleClick}>
            {value}
        </div >
    }
}
