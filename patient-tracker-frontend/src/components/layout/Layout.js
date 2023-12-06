import classes from './Layout.module.css'
import MainNavigation from './MainNavigation'
import Header from '../common/Header'

function Layout(props) {
    return (
        <div>
            <Header />
            <main className={classes.main}>
                {props.children}
            </main>
        </div>
    )
}


export default Layout