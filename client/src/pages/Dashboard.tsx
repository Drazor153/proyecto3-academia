import menuItems from '../pages.tsx'
import '../scss/dashboard.scss'
import { NavLink } from 'react-router-dom'

function Dashboard() {
    return (
        <>
            <h1>Dashboard</h1>
            <main>
                <div className="content dashboard">
                    <section className='shortcuts-container'>
                        <h2>Shortcuts</h2>
                        <div className='grid'>
                            {menuItems.map((item, index) => (
                                <NavLink className='shortcut'
                                    to={item.path}
                                    key={index}
                                    style={{ backgroundColor: item.color }}
                                >
                                    <div className='icon'>
                                        {item.icon}
                                    </div>
                                    <div className='name'>
                                        {item.name}
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Dashboard