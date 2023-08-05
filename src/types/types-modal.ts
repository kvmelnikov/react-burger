
interface IhandleCloseModal {
    ():never
}

export interface IModalOverlay {
    handleCloseModal: IhandleCloseModal,
}

export interface IModal extends IModalOverlay {
   
    heading?: string
    children?: React.ReactNode
}