import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import PhoneNumberInput from "react-phone-number-input/input";
import "../../components/InputWhatssap/InputWhatssap.css";

function getOnlyNumbers(value) {
  return String(value || "").replace(/\D/g, "");
}

function getMaxPhoneDigitsByCountry(country) {
  if (country === "BR") {
    return 13;
  }

  return 15;
}

function isDigitKey(key) {
  return /^[0-9]$/.test(key);
}

export default function WhatsappInput({
  country,
  phone,
  error,
  onCountryChange,
  onPhoneChange,
  onBlur,
}) {
  const maxDigits = getMaxPhoneDigitsByCountry(country);

  function handleCountryChange(event) {
    const nextCountry = event.target.value;

    onCountryChange(nextCountry);
    onPhoneChange("");
  }

  function handlePhoneChange(value) {
    const nextValue = value || "";
    const onlyNumbers = getOnlyNumbers(nextValue);

    if (onlyNumbers.length > maxDigits) {
      return;
    }

    onPhoneChange(nextValue);
  }

  function handlePhoneKeyDown(event) {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(event.key)) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      return;
    }

    if (!isDigitKey(event.key)) {
      event.preventDefault();
      return;
    }

    const currentNumbers = getOnlyNumbers(phone);

    const input = event.currentTarget;
    const hasSelectedText = input.selectionStart !== input.selectionEnd;

    if (currentNumbers.length >= maxDigits && !hasSelectedText) {
      event.preventDefault();
    }
  }

  function handlePhonePaste(event) {
    const pastedText = event.clipboardData.getData("text");
    const pastedNumbers = getOnlyNumbers(pastedText);
    const currentNumbers = getOnlyNumbers(phone);

    const input = event.currentTarget;
    const hasSelectedText = input.selectionStart !== input.selectionEnd;

    if (!pastedNumbers) {
      event.preventDefault();
      return;
    }

    if (currentNumbers.length >= maxDigits && !hasSelectedText) {
      event.preventDefault();
      return;
    }

    if (
      currentNumbers.length + pastedNumbers.length > maxDigits &&
      !hasSelectedText
    ) {
      event.preventDefault();
    }
  }

  return (
    <div className="whatsapp-input">
      <select
        className="whatsapp-input__country"
        value={country}
        onChange={handleCountryChange}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
      >
        {getCountries().map((countryCode) => (
          <option key={countryCode} value={countryCode}>
            {countryCode} +{getCountryCallingCode(countryCode)}
          </option>
        ))}
      </select>

      <PhoneNumberInput
        className="whatsapp-input__number"
        country={country}
        value={phone}
        onChange={handlePhoneChange}
        onKeyDown={handlePhoneKeyDown}
        onPaste={handlePhonePaste}
        onBlur={onBlur}
        placeholder="(31) 98888-8888"
        limitMaxLength
        autoComplete="tel"
        aria-invalid={Boolean(error)}
      />
    </div>
  );
}
