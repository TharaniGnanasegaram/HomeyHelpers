
function Welcome() {
    return (
        <div>
            <h2>Welcome to Homey Helpers</h2>
        </div>
    )
}

const HomerHelpers = () => {
    return (
        <div>

            <div>
                <Welcome />
            </div>
            

        </div>

    )
}


const element = ReactDOM.createRoot(document.getElementById("root-1"));

element.render(<HomerHelpers />);