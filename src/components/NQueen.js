import React from 'react'
import Board from './Board'
export default function NQueen() {

    const [size,setSize] = React.useState(3)

    function handleChange(event) {
        console.log(event.target.value)
        setSize(event.target.value)
    }
    const [submit, setSubmit] = React.useState(false)
    function onSubmit()
    {
        setSubmit(true)
    }
    return (
        <div>
            <h1 className='text'>N-Queens-Visualizer</h1>
            <div>
                <h3 className='text sizeSubmission'>Select Board Dimensions</h3>
                <select value={size} onChange={handleChange} class="btn btn-danger dropdown-toggle sizeSubmission">
                    <option value={3} className="dropdown-item">3</option>
                    <option value={4} className="dropdown-item">4</option>
                    <option value={5} className="dropdown-item">5</option>
                    <option value={6} className="dropdown-item">6</option>
                    <option value={7} className="dropdown-item">7</option>
                    <option value={8} className="dropdown-item">8</option>
                    <option value={9} className="dropdown-item">9</option>
                </select>
                <button type="button" class="btn btn-success sizeSubmission" onClick={onSubmit}>Submit</button>
            </div>
            {submit && <Board size = {size}/>}
        </div>
    )
}