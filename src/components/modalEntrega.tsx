import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { verifyCep } from '@/hooks/visCep';

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
    const updateDeliveryInfo = (updates: Partial<DeliveryInfo>) => {
        onDeliveryInfoChange({ ...deliveryInfo, ...updates });
    };

    const updateAddress = (updates: Partial<DeliveryInfo['address']>) => {
        onDeliveryInfoChange({
            ...deliveryInfo,
            address: { ...deliveryInfo.address, ...updates } as DeliveryInfo['address']
        });
    };

    const isFormValid = () => {
        const basicInfo = deliveryInfo.name && deliveryInfo.phone && deliveryInfo.email;
        if (deliveryInfo.type === 'retirada') {
            return basicInfo;
        }
        return basicInfo &&
            deliveryInfo.address?.street &&
            deliveryInfo.address?.number &&
            deliveryInfo.address?.neighborhood &&
            deliveryInfo.address?.city &&
            deliveryInfo.address?.zipCode;
    };

    const handleChangeCep = async (cep: string) => {
        
        try {
            if (!cep || cep.length !== 8) {
                throw new Error('CEP inválido');
            }
            const response = await verifyCep(cep);
            updateAddress({ zipCode: response.cep });
            updateAddress({ street: response.logradouro });
            updateAddress({ neighborhood: response.bairro });
            updateAddress({ city: response.cidade });
            console.log("deliveryInfo", deliveryInfo);
        } catch (error) {
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

                <div className="space-y-4">
                    {/* Delivery Type */}
                    <div>
                        <Label className="text-base font-semibold">Tipo de Pedido</Label>
                        <RadioGroup
                            value={deliveryInfo.type}
                            onValueChange={(value: 'entrega' | 'retirada') =>
                                updateDeliveryInfo({ type: value })
                            }
                            className="mt-2"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="retirada" id="type-retirada" />
                                <Label htmlFor="type-retirada">Retirar no local</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="entrega" id="type-entrega" />
                                <Label htmlFor="type-entrega">Entrega em casa</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Nome completo</Label>
                            <Input
                                id="name"
                                value={deliveryInfo.name}
                                onChange={(e) => updateDeliveryInfo({ name: e.target.value })}
                                placeholder="Seu nome completo"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                                id="phone"
                                value={deliveryInfo.phone}
                                onChange={(e) => updateDeliveryInfo({ phone: e.target.value })}
                                placeholder="(11) 99999-9999"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={deliveryInfo.email}
                                onChange={(e) => updateDeliveryInfo({ email: e.target.value })}
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    {/* Address (only for delivery) */}
                    {deliveryInfo.type === 'entrega' && (
                        <div className="space-y-4">
                            <h4 className="font-semibold">Endereço de Entrega</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <Label htmlFor="street">Rua</Label>
                                    <Input
                                        id="street"
                                        value={deliveryInfo.address?.street || ''}
                                        onChange={(e) => updateAddress({ street: e.target.value })}
                                        placeholder="Nome da rua"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="number">Número</Label>
                                    <Input
                                        id="number"
                                        value={deliveryInfo.address?.number || ''}
                                        onChange={(e) => updateAddress({ number: e.target.value })}
                                        placeholder="123"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="neighborhood">Bairro</Label>
                                    <Input
                                        id="neighborhood"
                                        value={deliveryInfo.address?.neighborhood || ''}
                                        onChange={(e) => updateAddress({ neighborhood: e.target.value })}
                                        placeholder="Nome do bairro"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="complement">Complemento</Label>
                                    <Input
                                        id="complement"
                                        value={deliveryInfo.address?.complement || ''}
                                        onChange={(e) => updateAddress({ complement: e.target.value })}
                                        placeholder="Apto, bloco, etc. (opcional)"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="city">Cidade</Label>
                                    <Input
                                        id="city"
                                        value={deliveryInfo.address?.city || ''} 
                                        onChange={(e) => updateAddress({ city: e.target.value })}
                                        placeholder="Nome da cidade"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="zipCode">CEP</Label>
                                    <Input
                                        id="zipCode"
                                        value={deliveryInfo.address?.zipCode}
                                        onChange={(e) => handleChangeCep(e.target.value)}
                                        placeholder="00000-000"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="pt-2">
                        <Button
                            onClick={handleGoToSummary}
                            disabled={!isFormValid()}
                            className="w-full"
                            size="lg"
                        >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Finalizar Pedido
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};