import axios from "axios";
import { AvailabilityData, MonthData } from '@mtronic-llc/common';

const cookies = "FPAU=1.1.107826460.1694725100; FPID=FPID2.2.LN0XsyNCi7KHUEaIjGfquQW%2FbKSYE4Hbu2BXgivjjNs%3D.1687560270; FPLC=BCv01ltU%2BB3lv2JqN0czB0fnFKoXVY6eVofIwnWoCrpyzx0fF8OfsLSE6tfVMV7yILiyFmUEI5Ej8NygBD4x4hmCJ7YLM36ABchEA%2BrEU5aDHO3Ce%2B2ps6tej5CWxg%3D%3D; _aaj=3%7C1%7C55Ie9BLZvg9QPTnEQDIKWesdmGHtD%2Fk6FByAJKnKSPpepWId2UmSR33pUW0lEe2hp0W1EiiqhiVpC7lvkBXCoJNr%2BEdrogS9Bz6UBQ0fLfsa51G2UihZMvmTpCyoDaMZqTaxqtRTm%2F2trVqHFcGTPHa5rMLzIewHrzCkLWtXbN4%2B6OIE22yuRk6h9Xw3DZu2BiUMw5dMWc7x5%2BIuZwozl45D2Z8Yrgu1%2BLfR9RZo0UaXCKTXBzShPnlKJ%2Fd2JQ8t3Q6635n8Cq08bvchNdIdSrN9l7U9A23HepMPLJXpSsss6b8skI5PhRQDoNbSeOA7jI5dFTbT%2BafktPiybd5mmGlWZ1gf9d9DYh1P9BO%2BHS4fKwrSu1Eq3v9KwZGFpuizoVkQdVFUM5TlLL2ylOotFhfP%2F618zM8iSb8FMRBNFXgGn3mgjgh4VWO8JISDqflpG4b%2FhJuj%2FM2Au9jcYJDHtoKYnKJoKM2om%2FCn1cAYyhLirEn0GOTBCuDXPDVe4Ixin68oX0Z2t0NLJ9a3i9zqfyfeVjgKbr6NkTDNn0nVn70WvCT1eP2oqucl01BGBbqfjqMO3YUUy81KwsjiAuigRWS281oznshCPly%2BTqJ75sFFcIOPyWINHqngNwTmVFEIYRETjTN7QgS4Yh%2FnCGkFTsjQOowx1oRX%2B6T59ZaPreq90sgh2giiWx8ctXIcGGC3TJbZ3%2F4LaxFDB4CR3F0qcsbufSuH3nmGnPblm1L93RuOit%2BlXA3SadKV3qf3tiKTwhhshEUCnz6rlGWCYnO%2FogE1%2FKjv1JFWOXckw9Lbtu0cKSj9TrXJ; _aat=0%7CJTiUwtEKs%2B0u%2FXLPIBHbUvA0njIbwaqozjgDIMpXpadm2Z2heiP9vN7MfDg0hn2E; _airbed_session_id=6051a062d931f04538c43d451f3575f3; _ga=GA1.1.2049337926.1694725101; _ga_2P6Q8PGG16=GS1.1.1698258697.15.1.1698258704.60.0.0; _gcl_au=1.1.107826460.1694725100; _pt=1--WyI5N2JkNjc1YWIzNjliMTM1M2QwNjdlNDU5ZTViMjRmYTY3MmMwYzMxIl0%3D--c05f4b83a0e4d26762450d14338a59174959e6e1; _user_attributes=%7B%22curr%22%3A%22COP%22%2C%22guest_exchange%22%3A4236.1025%2C%22device_profiling_session_id%22%3A%221687560265--19be7bd8e24730803c3c8ee9%22%2C%22giftcard_profiling_session_id%22%3A%221698258685-527314392-8d73d9ff69e96a9d1b4ad96c%22%2C%22reservation_profiling_session_id%22%3A%221698258685-527314392-f964bb2f7e8e367af4094d6c%22%2C%22id%22%3A527314392%2C%22hash_user_id%22%3A%2297bd675ab369b1353d067e459e5b24fa672c0c31%22%2C%22eid%22%3A%228D6XRpkAFRAyiVeecJ2EUA%3D%3D%22%2C%22num_h%22%3A0%2C%22name%22%3A%22Angel%2BDavid%22%2C%22num_action%22%3A0%2C%22is_admin%22%3Afalse%2C%22can_access_photography%22%3Afalse%2C%22travel_credit_status%22%3Anull%2C%22referrals_info%22%3A%7B%22receiver_max_savings%22%3Anull%2C%22receiver_savings_percent%22%3Anull%2C%22receiver_signup%22%3Anull%2C%22referrer_guest%22%3A%22%2458%2C000%2BCOP%22%2C%22terms_and_conditions_link%22%3A%22%2Fhelp%2Farticle%2F2269%22%2C%22wechat_link%22%3Anull%2C%22offer_discount_type%22%3Anull%7D%7D; abb_fa2=%7B%22user_id%22%3A%2280%7C1%7COhGfO41WgXbKDK81wBQrYLLgIfdJaXHvwyvX2NKb4UxHwBlXirW8gmc%3D%22%7D; bev=1687477499_MGFhOGZjMTU4MDYz; cbkp=3; cdn_exp_207aed2075a2b1a04=control; cdn_exp_46377ecda79cfcfe3=control; cdn_exp_5577d10ed9a3b89e4=control; cdn_exp_a9d6070a0416b7ace=treatment; cdn_exp_c112226c2b200fef6=control; cdn_exp_c381d694c46b4fd03=treatment; cdn_exp_f239beb666e2c3231=treatment; cfrmfctr=DESKTOP; country=CO; everest_cookie=1687560265.N0jfFbWbcg1U3439VN7R.Z_edKCGhNYVluVcGehx9AX-zrtWyc5g4RqLPnEiVEHk; frmfctr=wide; hli=1; jitney_client_session_created_at=1698258688.709; jitney_client_session_id=2bdd04c9-495f-4d06-86e5-ae7fcc28f219; jitney_client_session_updated_at=1698258699.972; li=1; rclmd=%7B%22527314392%22%3A%22google%22%7D; rclu=%7B%22527314392%22%3A%22WZOVfDKTMjuak4atth7C%2B5A2yoQAAQPBM7AQx%2FFYs%2Fk%3D%22%7D; sticky_locale=en; tzo=-300; OptanonAlertBoxClosed=2023-10-25T18%3A31%3A44.436Z; OptanonConsent=0_183215%3A1%2C0_200000%3A1%2C0_183345%3A1%2C0_183243%3A1%2C0_183216%3A1%2C0_179751%3A1%2C0_200003%3A1%2C0_200005%3A1%2C0_179754%3A1%2C0_179750%3A1%2C0_179737%3A1%2C0_179744%3A1%2C0_179739%3A1%2C0_179743%3A1%2C0_179749%3A1%2C0_200012%3A1%2C0_200011%3A1%2C0_183217%3A1%2C0_183219%3A1%2C0_183096%3A1%2C0_179747%3A1%2C0_179740%3A1%2C0_179752%3A1%2C0_183241%3A1%2C0_200007%3A1%2C0_183346%3A1%2C0_183095%3A1%2C0_210000%3A1%2C0_210001%3A1%2C0_210002%3A1%2C0_210003%3A1; __stripe_mid=73f1ac04-0a15-443f-9bd8-67b84fa08f34412e1a; previousTab=%7B%22id%22%3A%22f4521ebf-735b-4b82-bd3a-c5f7d2c963bb%22%7D";
const headers: Record<string, string> = {
    "authority": "www.airbnb.com",
    "accept": "*/*",
    "accept-language": "en,es-419;q=0.9,es;q=0.8,es-ES;q=0.7,en-GB;q=0.6,en-US;q=0.5",
    "content-type": "application/json",
    "cookie": "bev=1687477499_MGFhOGZjMTU4MDYz; everest_cookie=1687560265.N0jfFbWbcg1U3439VN7R.Z_edKCGhNYVluVcGehx9AX-zrtWyc5g4RqLPnEiVEHk; tzo=-300; FPID=FPID2.2.LN0XsyNCi7KHUEaIjGfquQW%2FbKSYE4Hbu2BXgivjjNs%3D.1687560270; __stripe_mid=73f1ac04-0a15-443f-9bd8-67b84fa08f34412e1a; _airbed_session_id=6051a062d931f04538c43d451f3575f3; cdn_exp_f239beb666e2c3231=treatment; cdn_exp_a9d6070a0416b7ace=treatment; cdn_exp_207aed2075a2b1a04=control; OptanonConsent=0_183215%3A1%2C0_200000%3A1%2C0_183345%3A1%2C0_183243%3A1%2C0_183216%3A1%2C0_179751%3A1%2C0_200003%3A1%2C0_200005%3A1%2C0_179754%3A1%2C0_179750%3A1%2C0_179737%3A1%2C0_179744%3A1%2C0_179739%3A1%2C0_179743%3A1%2C0_179749%3A1%2C0_200012%3A1%2C0_200011%3A1%2C0_183217%3A1%2C0_183219%3A1%2C0_183096%3A1%2C0_179747%3A1%2C0_179740%3A1%2C0_179752%3A1%2C0_183241%3A1%2C0_200007%3A1%2C0_183346%3A1%2C0_183095%3A1%2C0_210000%3A1%2C0_210001%3A1%2C0_210002%3A1; _gcl_au=1.1.107826460.1694725100; _ga=GA1.1.2049337926.1694725101; cdn_exp_46377ecda79cfcfe3=control; cdn_exp_5577d10ed9a3b89e4=control; country=CO; cdn_exp_c381d694c46b4fd03=treatment; FPAU=1.1.107826460.1694725100; auth_jitney_session_id=979ef5cb-cdf0-4147-8873-e9b43d586ef4; _csrf_token=V4%24.airbnb.com%24B10Qa1xofyE%24I8xRsbvL_cB4x8x0m5M7kEQl5ykA4MoSsJnKUzXtvrU%3D; _pt=1--WyI5N2JkNjc1YWIzNjliMTM1M2QwNjdlNDU5ZTViMjRmYTY3MmMwYzMxIl0%3D--c05f4b83a0e4d26762450d14338a59174959e6e1; hli=1; rclmd=%7B%22527314392%22%3A%22google%22%7D; roles=0; rclu=%7B%22527314392%22%3A%22WZOVfDKTMjuak4atth7C%2B5A2yoQAAQPBM7AQx%2FFYs%2Fk%3D%22%7D; abb_fa2=%7B%22user_id%22%3A%2280%7C1%7COhGfO41WgXbKDK81wBQrYLLgIfdJaXHvwyvX2NKb4UxHwBlXirW8gmc%3D%22%7D; _aat=0%7CJTiUwtEKs%2B0u%2FXLPIBHbUvA0njIbwaqozjgDIMpXpadm2Z2heiP9vN7MfDg0hn2E; li=1; hli=1; flags=0; sticky_locale=en; cfrmfctr=DESKTOP; cbkp=3; frmfctr=wide; fbs=not_authorized; _aaj=3%7C1%7CuOnfAhFM4L4TSmiEHmDjQCvJiV%2FJE%2Feosd%2FDLRaIchhpQEj9R1i9AVoeu%2FxCgDOWtzJdptzsCzk%2FWnyvoQWwfVcVN5HE7i9ZrT2RnBHwg9DUagEcy8dyll3DSMKBmYcL%2B7p8l5ef8L1K0Zd9MaE1EajlXeNGTkeo5GCp6EAhsl%2F%2BFyiRJUHdr1pMk34nYgNTYJ1naOya2u4%2Bg3JxPxKsLqv4IrvPtcH6JzP4fLClFztu3vkvDAECR6cwXe1hkeQtq0EzmY2r1K9D8eklmm9Oxs8chGOsc0zSl4OD6loetjQHorPRTzfhIDjSxin%2FF0lXmPrAOl%2BoMrGSqbb%2Bklcc4PdXgXzyW6vDOWzp2UOaMO%2B%2F4Wh6GpQFft%2FlxDLF0e1OoPiw%2F%2Bpc8lRU4nFHODeZEtnbpV2wg%2BCyrixEynVb8SIltvOQ2ermZp9mHZQerR3Sqou3vIURFB2NyyZL75E6OAxV2oOE7ALKASsg4owYFHxpVdRpl%2FN5Eg9cUyiKQQkqjmcc0b9XPSQulWMhcEm%2FmaNm72ancADPNtiOL5%2BYcB203G9Y7LeAwF8g8nFj1ye%2FfO93%2FXlCOwk1I5opwp7YV6nNTqZDyEs6%2Fd43F0uAsRfE%2BScXVypDN8YEKWB4%2F4c1Fb5oKv7rTUTQKuYH0UYqHpekb74TJIUqV3xLNC5B4UEfZcOUXvVrqulN5LIbx0ThXkBcrFAE5nY4DIeJNyM4%2B%2B%2FLPuatRjLE8TZAmoxGD3tZYW013d60JNj2R6NbOZ%2ByU19qsxcQ4a0GJHExrEVzYNmV%2Bi0GzpPN2rAERtnRVQ1YJb85Kfb0; _user_attributes=%7B%22curr%22%3A%22COP%22%2C%22guest_exchange%22%3A4236.1025%2C%22device_profiling_session_id%22%3A%221687560265--19be7bd8e24730803c3c8ee9%22%2C%22giftcard_profiling_session_id%22%3A%221697404019-527314392-1c80b16a97b40f8f6db3e7b3%22%2C%22reservation_profiling_session_id%22%3A%221697404019-527314392-be35c9eacfa5e1513db2d079%22%2C%22id%22%3A527314392%2C%22hash_user_id%22%3A%2297bd675ab369b1353d067e459e5b24fa672c0c31%22%2C%22eid%22%3A%228D6XRpkAFRAyiVeecJ2EUA%3D%3D%22%2C%22num_h%22%3A0%2C%22name%22%3A%22Angel%2BDavid%22%2C%22num_action%22%3A0%2C%22is_admin%22%3Afalse%2C%22can_access_photography%22%3Afalse%2C%22travel_credit_status%22%3Anull%2C%22referrals_info%22%3A%7B%22receiver_max_savings%22%3Anull%2C%22receiver_savings_percent%22%3Anull%2C%22receiver_signup%22%3Anull%2C%22referrer_guest%22%3A%22%2458%2C000%2BCOP%22%2C%22terms_and_conditions_link%22%3A%22%2Fhelp%2Farticle%2F2269%22%2C%22wechat_link%22%3Anull%2C%22offer_discount_type%22%3Anull%7D%7D; ak_bmsc=424030DB94C72603E2170C6EBCA91573~000000000000000000000000000000~YAAQt6pLaDlVaRyLAQAAbOQpNRW6WuSDt5SsfjaZE5cYfLQbVklCIMTqGEuLtw+3dR+tC5KzaTk45xew6AzH0cHB7qCxz5Xe1gQzr9/5eWYtVKgaVMnn9FS9xqRfw8qnvCEH8NJmZx6h7toiqptQp0e/JWCPsEeEC2dMFx/xTFIRIv58mdD9EDlue2TcQCKFUZt2UFaUYn+14WPdt7YjzGh4EK80ywzAVvYeBdfTjoyWQR3rtJ1YIAJnsiyxH7SKXCBk7C6BpPKhnbHKkRpNv5gxOyh1On6bBy1u4MjQ7zr2UooYaaCeoAQtFl1Z2j6TLTfnAambB+hJZSzqsAjujlMOGCos4MR4c+35H6y8AWMqL0LgxUP1JKcZDdKbCl5CK8tUfnwbCd4=; jitney_client_session_id=a7179eca-ba96-4c30-a667-fa867ed08a54; jitney_client_session_created_at=1697404019.23; previousTab=%7B%22id%22%3A%22dd4a1f25-6aee-4179-9116-8057a52fb63e%22%7D; FPLC=8M4e8UbEX2MC4iesgzsCLHCzrrv36jHZPUTM4HiTuswQqSdFaAtT1gC2om9Btlld1kfjpg1t6m4341dxp2bnI7tnrm36GHIYDdPHjtpYzK49tG1jTzoexKAk0wXCow%3D%3D; jitney_client_session_updated_at=1697404036.362; _ga_2P6Q8PGG16=GS1.1.1697404023.8.1.1697404040.47.0.0; OptanonAlertBoxClosed=2023-10-15T21%3A07%3A20.417Z; bm_sv=C4C05C0E014C690A15E08D35591EE0DF~YAAQt6pLaCZXaRyLAQAADjwqNRU9S0tVaaSnVPgg+GryoI3G9Xcm6rfZK44HrDTuLKN4l4p5Ez5Ay3pEq1ueJHx6rSMapqQvsS5VnVsq/ukAo2+Wi+TD2wKqpTiC9PvGYvyyXzI8+zrxQARgtMq1Q+aG02l2Nns2JqpT7Vtx466+KUCvvsccHxiHHQsJ3fvyhYlgmBuGOVCesYBQC49prwjdP4lD/YjvjgYBR8TX/bHXKnfJCR6/ZUWfDbEcrWJwWA==~1",
    "device-memory": "8",
    "dpr": "1",
    "ect": "4g",
    "sec-ch-ua": '"Chromium";v="118", "Microsoft Edge";v="118", "Not=A?Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-ch-ua-platform-version": '"15.0.0"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.46",
    "viewport-width": "1358",
    "x-airbnb-api-key": "d306zoyjsyarp7ifhu67rjxn52tv0t20",
    "x-airbnb-graphql-platform": "web",
    "x-airbnb-graphql-platform-client": "minimalist-niobe",
    "x-airbnb-supports-airlock-v2": "true",
    "x-client-request-id": "11bjrkl1x7xdpj07i9osi00tj36e",
    "x-client-version": "3654efc1d1175244b86fcc7a9fbe894430012767",
    "x-csrf-token": "V4^$.airbnb.com^$B10Qa1xofyE^$I8xRsbvL_cB4x8x0m5M7kEQl5ykA4MoSsJnKUzXtvrU=",
    "x-csrf-without-token": "1",
    "x-niobe-short-circuited": "true"
}

const options = {
    method: 'GET',
    withCredentials: true,
    headers: {
        ...headers,
        'Cookie': cookies,
    },
};

const getData = async (url: string) => {
    try {
        const response = await axios(url, options);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Error: ', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error: ', error);
        return false;
    }
};

const availabilityPlace = async (id: string, month: number, year: number, original: boolean) => {
    if (!id) {
        return {
            error: "El ID es obligatorio"
        }
    }

    //contiene un JSON de meses si la solicitud fue exitosa
    const dataAvail = await getData(`https://www.airbnb.com/api/v3/PdpAvailabilityCalendar?operationName=PdpAvailabilityCalendar&locale=en&currency=COP&variables=%7B%22request%22%3A%7B%22count%22%3A12%2C%22listingId%22%3A%22${id}%22%2C%22month%22%3A${month}%2C%22year%22%3A${year}%7D%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%228f08e03c7bd16fcad3c92a3592c19a8b559a0d0855a84028d1163d4733ed9ade%22%7D%7D`);

    if (dataAvail.errors) {
        return dataAvail.errors;
    }

    if (!dataAvail) {
        return {
            error: `Hubo un error en la solicitud para el lugar: ${id}`
        }
    }

    if (original) {
        return dataAvail;
    }

    //extrae datos de los meses de la solicitud
    const monthsData = dataAvail.data.merlin.pdpAvailabilityCalendar.calendarMonths;
    let availabilitySixMonths: number = 0;

    //objeto nuevo con los datos parseados
    const parsedData = new AvailabilityData(id, 0, []);

    //recorre cada mes del JSON devuelto por la solicitud
    for (let i: number = 0; i < monthsData.length; i++) {
        const currentMonth = monthsData[i];
        let availableDays: number = 0;

        //recorre cada día de cada mes
        for (let j: number = 0; j < currentMonth.days.length; j++) {
            //si el día es disponible se suma
            if (currentMonth.days[j].available) {
                availableDays++;
            }
        }

        //porcentaje de disponibilidad por mes
        let availabilityPercent: number = (availableDays / currentMonth.days.length) * 100;

        //suma los porcentajes de disponibilidad de los primeros 6 meses
        if (i < 6) {
            availabilitySixMonths += availabilityPercent;
        }

        currentMonth.availabilityPercentage = Math.round(availabilityPercent);
        const year: number = currentMonth.year;
        const month: number = currentMonth.month;

        //objeto parseado para cada mes
        const parsedMonth = new MonthData(year, month, Math.round(availabilityPercent));
        //guardando cada mes en el objeto parseado
        parsedData.meses.push(parsedMonth);
    }
    //divide la suma de porcentajes de los primeros 6 meses;
    availabilitySixMonths /= 6;
    //redondea y guarda la disponibilidad
    parsedData.proxSeisMeses = Math.round(availabilitySixMonths);
    return parsedData;
}


export {
    getData,
    availabilityPlace
}
