export const SIMPLE_DEX_ADDRESS = '0x99a13eaec00505474f98fb0485d2c0fb6399f6e8';

export const SIMPLE_DEX_ABI = [
  "function addLiquidity(uint256 tokenAAmount, uint256 tokenBAmount) external",
  "function removeLiquidity(uint256 lpAmount) external",
  "function swapAForB(uint256 amountA) external",
  "function swapBForA(uint256 amountB) external",
  "function getPrice(address token) external view returns (uint256)",
  "function tokenA() external view returns (address)",
  "function tokenB() external view returns (address)",
  "function lpToken() external view returns (address)"
];