import React from 'react';
import Album from './Components/Album';
import Example from './hook/example';

function App() {
    return (
        <div className="App">
            <Album />
            {/* Render out the GraphQL hook as a component */}
            <Example />
        </div>
    );
}

export default App;
