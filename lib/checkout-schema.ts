import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().trim().min(3, "Informe seu nome completo."),
  email: z.email("Informe um e-mail válido."),
  phone: z.string().regex(/^\d{10,11}$/, "Informe um telefone válido, apenas com números."),
  postalCode: z.string().regex(/^\d{8}$/, "Informe um CEP válido, apenas com números."),
  address: z.string().trim().min(3, "Informe o endereço."),
  number: z.string().trim().min(1, "Informe o número."),
  city: z.string().trim().min(2, "Informe a cidade."),
  state: z.string().trim().length(2, "Use a sigla do estado."),
  shipping: z.enum(["standard", "express"]),
  cardName: z.string().trim().min(3, "Informe o nome impresso."),
  cardNumber: z.string().regex(/^\d{16}$/, "Use um cartão fictício de 16 dígitos."),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Use o formato MM/AA."),
  cvv: z.string().regex(/^\d{3,4}$/, "Informe um CVV fictício."),
});

export type CheckoutData = z.infer<typeof checkoutSchema>;
