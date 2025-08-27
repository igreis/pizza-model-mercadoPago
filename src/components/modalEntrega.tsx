import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { verifyCep } from '@/hooks/visCep';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface DeliveryInfo {
    type: 'entrega' | 'retirada';
    name: string;
    phone: string;
    email: string;
    address?: {
        street: string;
        number: string;
        neighborhood: string;
        complement: string;
        city: string;
        zipCode: string;
    };
}

interface DeliveryInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    deliveryInfo: DeliveryInfo;
    onDeliveryInfoChange: (deliveryInfo: DeliveryInfo) => void;
    onBack: () => void;
    handleGoToSummary: () => void;
}

export const DeliveryInfoModal = ({
    isOpen,
    onClose,
    deliveryInfo,
    onDeliveryInfoChange,
    onBack,
    handleGoToSummary
}: DeliveryInfoModalProps) => {
    const addressSchema = z.object({
        street: z.string().min(1, 'Informe a rua'),
        number: z.string().min(1, 'Informe o número'),
        neighborhood: z.string().min(1, 'Informe o bairro'),
        complement: z.string().optional().default(''),
        city: z.string().min(1, 'Informe a cidade'),
        zipCode: z.string().min(8, 'Informe o CEP')
    });

    const formSchema = z.object({
        type: z.enum(['entrega', 'retirada']),
        name: z.string().min(1, 'Informe seu nome'),
        phone: z.string().min(8, 'Informe um telefone'),
        email: z.string().email('Email inválido'),
        address: addressSchema.optional()
    }).superRefine((data, ctx) => {
        if (data.type === 'entrega') {
            if (!data.address) {
                ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Preencha o endereço completo', path: ['address'] });
                return;
            }
            // ensure all required fields are present
            const required = ['street', 'number', 'neighborhood', 'city', 'zipCode'] as const;
            for (const key of required) {
                if (!data.address[key] || String(data.address[key]).trim().length === 0) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Campo obrigatório', path: ['address', key] });
                }
            }
        }
    });

    const defaultAddress = {
        street: '',
        number: '',
        neighborhood: '',
        complement: '',
        city: '',
        zipCode: ''
    };

    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isValid }
    } = useForm<DeliveryInfo>({
        resolver: zodResolver(formSchema) as any,
        mode: 'onChange',
        defaultValues: {
            ...deliveryInfo,
            address: deliveryInfo.address ?? defaultAddress
        }
    });

    useEffect(() => {
        reset({
            ...deliveryInfo,
            address: deliveryInfo.address ?? defaultAddress
        });
    }, [deliveryInfo, reset]);

    const onSubmit = (data: DeliveryInfo) => {
        onDeliveryInfoChange(data);
        handleGoToSummary();
    };

    const handleCepLookup = async (cep: string) => {
        try {
            const clean = cep.replace(/\D/g, '');
            if (!clean || clean.length !== 8) return; // aguarda 8 dígitos
            const response = await verifyCep(clean);
            setValue('address.zipCode', response.cep, { shouldValidate: true });
            setValue('address.street', response.logradouro, { shouldValidate: true });
            setValue('address.neighborhood', response.bairro, { shouldValidate: true });
            setValue('address.city', response.cidade, { shouldValidate: true });
        } catch (error) {
            // falha silenciosa; usuário pode editar manualmente
            console.error(error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="relative">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onBack}
                        className="absolute -top-1 -left-1 h-8 w-8 p-0"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <DialogTitle className="text-center">Informações de Entrega</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Delivery Type */}
                    <div>
                        <Label className="text-base font-semibold">Tipo de Pedido</Label>
                        <Controller
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <RadioGroup value={field.value} onValueChange={field.onChange} className="mt-2">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="retirada" id="type-retirada" />
                                        <Label htmlFor="type-retirada">Retirar no local</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="entrega" id="type-entrega" />
                                        <Label htmlFor="type-entrega">Entrega em casa</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nome completo</Label>
                            <Input id="name" placeholder="Seu nome completo" {...register('name')} />
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message as string}</p>}
                        </div>
                        <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" placeholder="(11) 99999-9999" {...register('phone')} />
                            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message as string}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" {...register('email')} />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>}
                        </div>
                    </div>

                    {/* Address (only for delivery) */}
                    {watch('type') === 'entrega' && (
                        <div className="space-y-4">
                            <h4 className="font-semibold">Endereço de Entrega</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="zipCode">CEP</Label>
                                    <Input
                                        id="zipCode"
                                        placeholder="00000-000"
                                        {...register('address.zipCode', {
                                            onBlur: (e) => handleCepLookup(e.target.value)
                                        })}
                                    />
                                    {errors.address?.zipCode && <p className="text-sm text-red-500 mt-1">{errors.address.zipCode.message as string}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <Label htmlFor="street">Rua</Label>
                                    <Input id="street" placeholder="Nome da rua" disabled={true} {...register('address.street')} />
                                    {errors.address?.street && <p className="text-sm text-red-500 mt-1">{errors.address.street.message as string}</p>}
                                </div>

                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="number">Número</Label>
                                    <Input id="number" placeholder="123" {...register('address.number')} />
                                    {errors.address?.number && <p className="text-sm text-red-500 mt-1">{errors.address.number.message as string}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="complement">Complemento</Label>
                                    <Input id="complement" placeholder="Apto, bloco, etc. (opcional)" {...register('address.complement')} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">Cidade</Label>
                                    <Input id="city" placeholder="Nome da cidade" disabled={true} {...register('address.city')} />
                                    {errors.address?.city && <p className="text-sm text-red-500 mt-1">{errors.address.city.message as string}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="neighborhood">Bairro</Label>
                                    <Input id="neighborhood" placeholder="Nome do bairro" disabled={true} {...register('address.neighborhood')} />
                                    {errors.address?.neighborhood && <p className="text-sm text-red-500 mt-1">{errors.address.neighborhood.message as string}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                        <Button type="submit" disabled={!isValid} className="w-full" size="lg">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Finalizar Pedido
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};