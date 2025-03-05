import Swal,{SweetAlertIcon} from "sweetalert2";

interface alert {
    title?: string,
    content: string,
    icon?:string
}
const swAlert = {
    async confirm(props:alert){
        const icon:SweetAlertIcon = props.icon as SweetAlertIcon || "success";
        await Swal.fire(props.title, props.content, icon);
    }
}

export default swAlert