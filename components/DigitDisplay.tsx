import Image from "next/image";

interface DigitDisplayProps {
  number: number;
  className?: string;
}

export function DigitDisplay({ number, className = "" }: DigitDisplayProps) {
  const digits = Math.abs(number).toString().padStart(5, "0").split("");

  return (
    <div className={`flex items-center ${className}`}>
      {digits.map((digit, index) => (
        <Image
          key={index}
          src={`/images/digits/${digit}F.gif`}
          alt={digit}
          width={20}
          height={30}
          className="inline-block m-1"
        />
      ))}
    </div>
  );
}
