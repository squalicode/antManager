function StatCounter({ stat, icon, amount }) {
    const multiplier = Math.pow(10, 1 || 0);
    const fixedAmount = Math.round(amount * multiplier) / multiplier;
    return (
      <>{icon} <span className="data">{fixedAmount}</span> {stat}</>
    );
  }
  
export default StatCounter;