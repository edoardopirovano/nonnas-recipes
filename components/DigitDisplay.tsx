import Image from "next/image";

interface DigitDisplayProps {
  number: number;
  className?: string;
}

export function DigitDisplay({ number, className = "" }: DigitDisplayProps) {
  // Convert number to string and pad with zeros if needed
  const digits = Math.abs(number).toString().padStart(1, "0").split("");

  return (
    <div className={`flex items-center ${className}`}>
      {digits.map((digit, index) => (
        <Image
          key={index}
          src={`/images/digits/${digit}F.gif`}
          alt={digit}
          width={20}
          height={30}
          className="inline-block"
        />
      ))}
    </div>
  );
}
