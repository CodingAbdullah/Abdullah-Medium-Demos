const LoginPage = () => {

    return (
        <div className="login-page">
            <h1>Login Form</h1>
            <form>
                <div class="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default LoginPage;