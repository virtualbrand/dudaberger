
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

interface PresetAccessModalProps {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
};

function formatPhone(value: string) {
  // Remove tudo que não for número e limita a 11 dígitos
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    // (99) 9999-9999
    return digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, function(_, d1, d2, d3) {
      let out = '';
      if (d1) out += `(${d1}`;
      if (d1 && d1.length === 2) out += ') ';
      if (d2) out += d2;
      if (d2 && d2.length === 4) out += '-';
      if (d3) out += d3;
      return out;
    });
  } else {
    // (99) 99999-9999
    return digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, function(_, d1, d2, d3) {
      let out = '';
      if (d1) out += `(${d1}`;
      if (d1 && d1.length === 2) out += ') ';
      if (d2) out += d2;
      if (d2 && d2.length === 5) out += '-';
      if (d3) out += d3;
      return out;
    });
  }
}

function AppInput({
  label, placeholder, type = "text", register, error, className = "", value, onChange, onBlur, touched, name, ...rest
}: any) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Máscara e bloqueio de letras para telefone
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'phone') {
      const formatted = formatPhone(e.target.value);
      if (onChange) onChange({ ...e, target: { ...e.target, value: formatted } });
    } else {
      if (onChange) onChange(e);
    }
  };

  // Bloquear letras no input telefone
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (name === 'phone' && /[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full min-w-[200px] relative">
      {label && (
        <label className="block mb-1 text-xs font-bold text-white font-kumbh text-left">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={type}
          className={`relative z-10 border-2 border-[#bfc9c7] h-12 w-full rounded-md bg-white px-4 outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#e6eae9] placeholder:font-normal text-sm lg:text-base font-normal text-gray-800 placeholder:text-gray-400 ${className}`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={onBlur}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...(value === undefined && register ? register : {})}
          {...rest}
        />
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, #CC8A3A 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, #CC8A3A 0%, transparent 70%)`,
              }}
            />
          </>
        )}
      </div>
  {error && <p className="text-sm mt-1 font-kumbh text-left" style={{ color: '#8D412A' }}>{error}</p>}
    </div>
  );
}


export default function PresetAccessModal({ open, onClose }: PresetAccessModalProps) {
  const { register, handleSubmit, formState: { errors, touchedFields }, reset, setValue } = useForm<FormData>({ mode: "onTouched" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    reset();
    setPhoneValue("");
    setIsSubmitting(false);
    onClose();
    window.location.href = `https://pay.hotmart.com/T86837978R?off=uq6jsrns&bid=1756069046655&name=${data.name}&email=${data.email}&phonenumber=${data.phone}&offDiscount=DESCONTO`;
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          style={{ animation: 'fadeIn 0.22s ease-out' }}
        >
          <div
            className="bg-[#7A8B89] rounded-lg p-8 w-full max-w-md relative shadow-2xl"
            style={{ animation: 'scaleIn 0.22s ease-out' }}
          >
            <button
              className="absolute top-4 right-4 text-white bg-transparent hover:bg-gray-200/30 rounded-full"
              style={{ padding: 0, margin: 0, border: 'none', background: 'transparent' }}
              onClick={onClose}
              aria-label="Fechar"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit(onSubmit)}>
              <AppInput
                label="Nome *"
                placeholder="Digite seu nome"
                register={register("name", { required: "Nome é obrigatório" })}
                error={errors.name?.message}
                touched={touchedFields.name}
              />
              <AppInput
                label="E-mail *"
                placeholder="seu@email.com"
                type="email"
                register={register("email", { 
                  required: "E-mail é obrigatório",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "E-mail inválido"
                  }
                })}
                error={errors.email?.message}
                touched={touchedFields.email}
              />
              <AppInput
                label="Telefone *"
                placeholder="(21) 99999-9999"
                type="tel"
                name="phone"
                value={phoneValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const formatted = formatPhone(e.target.value);
                  setPhoneValue(formatted);
                  setValue("phone", formatted, { shouldValidate: true });
                }}
                onBlur={(_e: React.FocusEvent<HTMLInputElement>) => setValue("phone", phoneValue, { shouldValidate: true })}
                register={register("phone", {
                  required: "Telefone é obrigatório",
                  validate: value => {
                    const digits = value.replace(/\D/g, "");
                    if (!(digits.length === 10 || digits.length === 11)) return "Telefone inválido";
                    return true;
                  }
                })}
                error={errors.phone?.message}
                touched={touchedFields.phone}
              />
              <button type="submit" disabled={isSubmitting} className="mt-2 bg-[#CC8A3A] hover:bg-[#b8772d] text-white font-bold px-4 py-3 rounded-md transition-all font-kumbh disabled:opacity-60">
                {isSubmitting ? "Enviando..." : "Solicitar acesso"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
