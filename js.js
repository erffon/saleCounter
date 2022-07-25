let endDate = document.querySelector('.calendar');


let day = document.querySelector('.day');
let hour = document.querySelector('.hour');
let minute = document.querySelector('.minute');
let second = document.querySelector('.second');

gsap.fromTo('.container',{opacity:0,scale:0.2},{opacity:1,scale:1,duration:1.5,ease: "power2.out"});
gsap.fromTo('.calendar',{opacity:0,y:50},{opacity:1,y:0,duration:2,ease: "power2.out"});
gsap.to('.fire-svg',{y:-10,repeat:3,yoyo:true,ease: "power2.out"},'>');

endDate.addEventListener('change',(e)=>{
    gsap.to('.calendar',{opacity:0,duration:1.5,ease: "power2.out"});
    gsap.to('.title',{y:10,repeat:1,yoyo:true,ease: "elastic.out(1, 0.3)"});

    e.preventDefault();
    endDate = new Date(endDate.value);
    endDateTimeStamp = toTimeStamp(endDate);

    let today = new Date();
    console.log(today.getTime());

    

    setInterval (()=>{
        localStorage.clear();

        let remainDay = daysDis(endDateTimeStamp);
        let remainHour = hoursDis(endDateTimeStamp);
        let remainMinute = minsDis(endDateTimeStamp);
        let remainSecond = secsDis(endDateTimeStamp);

        localStorage.setItem('remainDay',remainDay);
        localStorage.setItem('remainHour',remainHour);
        localStorage.setItem('remainMinute',remainMinute);
        localStorage.setItem('remainSecond',remainSecond);

        day.innerText = remainDay;
        hour.innerText = remainHour;
        minute.innerText = remainMinute;
        second.innerText = remainSecond;
    },1000);
})

//xx-xx-xxx to miliseconds
function toTimeStamp (date){
    return Date.parse(date);
}
//days distance
function daysDis (end){
    let now = new Date();
    now = Date.now();
    let distance = end - now;
    if (distance>=0){
        distance = Math.floor(distance/86400000);
        return distance;
    }
    else if (distance<0){
        return 'deadline is passed !';
    }
}
// hours distance
function hoursDis (end){
    let now = new Date();
    now = Date.now();
    let distance = end - now;
    if (distance>=0){
        distance = Math.floor((distance%86400000)/3600000) ;
        return distance;
    }
    else if (distance<0){
        return 'deadline is passed !';
    }
}
//minutes distance
function minsDis (end){
    let now = new Date();
    now = Date.now();
    let distance = end - now;
    if (distance>=0){
        distance = Math.floor((((distance%86400000)%3600000))/60000) ;
        return distance;
    }
    else if (distance<0){
        return 'deadline is passed !';
    }
}
//seconds distance
function secsDis (end){
    let now = new Date();
    now = Date.now();
    let distance = end - now;
    if (distance>=0){
        distance = Math.floor(((((distance%86400000)%3600000))%60000)/1000 );
        return distance;
    }
    else if (distance<0){
        return 'deadline is passed !';
    }
}