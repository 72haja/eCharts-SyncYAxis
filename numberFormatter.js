function setThousandSeparator(number) {
  return number.toLocaleString('de-DE');
}

function formatNumber(number, toFixedNumber) {
  return setThousandSeparator(
    Number(
      Number(number).toFixed(toFixedNumber),
    ),
  );
}

export {
  setThousandSeparator,
  formatNumber,
};
