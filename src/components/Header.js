const Header = ({handleNewGame, wins}) => {
    return (
        <header className="header">
            <h4>You have {wins} wins</h4>
            <h3>Memory Game</h3>
            <button onClick={handleNewGame}>Start New Game</button>
        </header>
    )
}

export default Header;