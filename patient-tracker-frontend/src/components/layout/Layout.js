import classes from './Layout.module.css'
import MainNavigation from './MainNavigation'
import Header from '../common/Header'

function Layout(props) {
    
    return (
        <div>
            <Header title={props.title} role={props.role}/>
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
    )
}


export default Layout