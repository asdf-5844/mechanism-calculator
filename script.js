const form = document.querySelector("#gear-form");
const driverInput = document.querySelector("#driver-teeth");
const drivenInput = document.querySelector("#driven-teeth");
const rpmInput = document.querySelector("#input-rpm");
const errorMessage = document.querySelector("#error");

function calculateGearRatio(event) {
  event?.preventDefault();

  const driverTeeth = Number(driverInput.value);
  const drivenTeeth = Number(drivenInput.value);
  const inputRpm = rpmInput.value === "" ? null : Number(rpmInput.value);

  if (!Number.isFinite(driverTeeth) || !Number.isFinite(drivenTeeth) || driverTeeth <= 0 || drivenTeeth <= 0) {
    errorMessage.textContent = "Enter positive tooth counts.";
    return;
  }

  if (inputRpm !== null && (!Number.isFinite(inputRpm) || inputRpm < 0)) {
    errorMessage.textContent = "Input speed cannot be negative.";
    return;
  }

  errorMessage.textContent = "";

  const ratio = drivenTeeth / driverTeeth;
  const speedChange = (1 / ratio - 1) * 100;
  const ratioType = ratio > 1 ? "reduction" : ratio < 1 ? "increase" : "direct drive";

  document.querySelector("#ratio").textContent = ratio.toFixed(2);
  document.querySelector("#ratio-note").textContent = `A ${ratio.toFixed(2)}:1 ${ratioType}.`;
  document.querySelector("#output-rpm").textContent =
    inputRpm === null ? "—" : `${(inputRpm / ratio).toFixed(1)} RPM`;
  document.querySelector("#speed-change").textContent =
    `${speedChange >= 0 ? "+" : "−"}${Math.abs(speedChange).toFixed(1)}%`;
  document.querySelector("#torque-factor").textContent = `${ratio.toFixed(2)}×`;
}

form.addEventListener("submit", calculateGearRatio);

[driverInput, drivenInput, rpmInput].forEach((input) => {
  input.addEventListener("input", calculateGearRatio);
});

document.querySelector("#swap-gears").addEventListener("click", () => {
  [driverInput.value, drivenInput.value] = [drivenInput.value, driverInput.value];
  calculateGearRatio();
});

document.querySelector("#reset").addEventListener("click", () => {
  driverInput.value = 20;
  drivenInput.value = 60;
  rpmInput.value = 1200;
  calculateGearRatio();
  driverInput.focus();
});