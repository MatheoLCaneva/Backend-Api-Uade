let nodemailer = require('nodemailer');
const SMTPPool = require('nodemailer/lib/smtp-pool');


exports.sendEmail = async function (req, res, next){
    console.log("mail",req)
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        //host: 'svp-02715.fibercorp.local',
        secure: true,
        port:25,
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'infoapiprofesor@gmail.com',//poner cuenta gmail
            pass: 'hxlukygraepvxvla'  //contraseña cuenta  IMPORTANTE HABILITAR acceso apps poco seguras google
        }
     });
    // Definimos el email
    var mailOptions = {
        from: 'infoapiprofesor@gmail.com',
        to: req.body.textoRechazo.email,
        subject: req.body.asunto,
        html: '<h3>' +req.body.textoRechazo.mensaje+'</h3>',
        
    };
    //console.log("mail",mailOptions)
    // Enviamos el email
    try
    {
        let info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return res.status(200).json({message:"Email enviado con éxito"})
    }
    catch(error)
    {
        console.log("Error envio mail: ",error);            
    }
};