import { create } from 'zustand';

export interface InvoiceState {
  newInvoice: any;
  addSenderInfo: (senderInfo: any, items: any) => void;
  addRecipientInfo: (recipientInfo: any, items: any) => void;
  updateItems: (items: any) => void
  updategrandTotal: (grandTotal: any) => void
}

export const useStore = create<InvoiceState>((set) => ({
  newInvoice: {},

  addSenderInfo: (senderInfo: any) => 
    set((state) => ({ newInvoice: {...state.newInvoice, senderInfo} })),

  addRecipientInfo: (recipientInfo: any) => 
    set((state) => ({ newInvoice: {...state.newInvoice, recipientInfo} })),

  updateItems: (items: any) => 
    set((state) => ({ newInvoice: {...state.newInvoice, items} })),

  updateTaxInfo: (taxInfo: any) => 
    set((state) => ({ newInvoice: {...state.newInvoice, taxInfo} })), 

  updategrandTotal: (grandTotal: any) => 
    set((state) => ({ newInvoice: {...state.newInvoice, grandTotal} })),

}));



