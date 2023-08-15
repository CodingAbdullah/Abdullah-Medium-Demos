import { useNavigate } from "react-router";

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className='page-404'>
            <h1>Page Not Found</h1>
            <button onClick={() => navigate("/") } className="btn btn-primary">Main Page</button>
        </div>
    )
}

export default Page404;