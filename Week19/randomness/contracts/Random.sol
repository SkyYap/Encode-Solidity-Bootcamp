contract Random {
    function getRandomNumber()
        public
        view
        returns (uint256 randomNumber)
    {
        // TODO: get randomness from previous block randao reveal
    }

    function tossCoin() public view returns (bool heads) {
        // TODO: make the random number be translated to a boolean
    }
}