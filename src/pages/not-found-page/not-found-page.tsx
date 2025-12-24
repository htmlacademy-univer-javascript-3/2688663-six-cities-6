import { Link } from "react-router-dom"

function NotFoundScreen(): JSX.Element {
    return (
        <div>
            <h1>Not Found 404</h1>
            <Link to="/">
                <span>На главную</span>
            </Link>
        </div>
    )
}

export default NotFoundScreen