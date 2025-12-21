"use client";

import { useGameStore } from "@/store/gameStore";

export default function Home() {
  const { game, loading, error, startGame, hit, stand } = useGameStore();

  const renderCard = (card: { suit: string; rank: string }) => {
    const suitSymbols: { [key: string]: string } = {
      Hearts: '♥',
      Diamonds: '♦',
      Clubs: '♣',
      Spades: '♠',
    };
    return (
      <div className="border rounded p-2 m-1 bg-white text-black text-center">
        {card.rank}{suitSymbols[card.suit]}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-800">
      <div className="bg-green-700 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Blackjack
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!game && (
          <div className="text-center">
            <button
              onClick={startGame}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {loading ? "Starting..." : "Start New Game"}
            </button>
          </div>
        )}

        {game && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Dealer</h2>
              <div className="flex flex-wrap justify-center">
                {game.dealerHand.map((card, index) => (
                  <div key={index}>{renderCard(card)}</div>
                ))}
              </div>
              <p className="text-white text-center mt-2">
                Score: {game.dealerScore}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Player</h2>
              <div className="flex flex-wrap justify-center">
                {game.playerHand.map((card, index) => (
                  <div key={index}>{renderCard(card)}</div>
                ))}
              </div>
              <p className="text-white text-center mt-2">
                Score: {game.playerScore}
              </p>
            </div>

            <div className="text-center">
              <p className="text-white text-xl mb-4">Status: {game.status}</p>

              {game.status === "playing" && (
                <div className="space-x-4">
                  <button
                    onClick={hit}
                    disabled={loading}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? "Hitting..." : "Hit"}
                  </button>
                  <button
                    onClick={stand}
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? "Standing..." : "Stand"}
                  </button>
                </div>
              )}

              {game.status !== "playing" && (
                <button
                  onClick={startGame}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  {loading ? "Starting..." : "New Game"}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
