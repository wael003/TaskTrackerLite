import {Link} from 'react-router-dom'

const Landing = () => {
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="logo"> Task Tracker</h1>

                    <div className="buttons">
                        <Link to={'/tasks'} className='btn btn-primary'>Tasks</Link>
                        <Link to={'/daily-report'} className='btn btn-light'>Get Daily Report</Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing