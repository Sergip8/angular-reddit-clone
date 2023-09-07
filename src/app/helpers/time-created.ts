

export class TimeCreated{

    public static getDateOfCreation(createdDate: Date): string{
       console.log(createdDate)
       let duration = Date.now() - new Date(createdDate).getTime()
        duration = duration/60000
        console.log(duration)

       if(duration < 1)
       return "creado hace un instante";
   else if(duration < 60 &&  duration >=1)
       return "creado hace "+ Math.trunc(duration) + " minutos";
   else if(duration/60 >= 1 && duration/60 < 24)
       return "creado hace "+ Math.trunc(duration/60) + " Horas";
   else if (duration/1440 >= 1)
       return "creado hace "+ Math.trunc(duration/1440)+ " Dias";
   return "";

    }
}