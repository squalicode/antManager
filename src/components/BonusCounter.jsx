function BonusCounter({ amount }) {
    const multiplier = Math.pow(10, 1 || 0);
    const fixedAmount = Math.round(amount * multiplier) / multiplier;
    return (
      <small>(turn bonus: <b>+{fixedAmount}</b>)</small>
    );
  }
  
export default BonusCounter;