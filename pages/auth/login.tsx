import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import theme from '../../config/theme.palette';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { validatePhoneNumber } from 'utils/helpers';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import VerificationInput from "react-verification-input";

// function numberToSmerinke(number: number): string {
//     const smerinkeDigits = ['ᒐ', '⎓', 'ꑍ', '৫', 'ꍌ', 'ꎭ', 'ಠ', 'Θ', '෴', '卐'];
//     const digitsArr = String(number).split('');
//     const smerinkeArr = digitsArr.map((digit: any) => smerinkeDigits[digit]);
//     return smerinkeArr.join('');
// }

// function smerinkeToNumber(smerinkeString: string): number {
//     const smerinkeDigits = ['ᒐ', '⎓', 'ꑍ', '৫', 'ꍌ', 'ꎭ', 'ಠ', 'Θ', '෴', '卐'];
//     const smerinkeArr = smerinkeString.split('');
//     const digitsArr = smerinkeArr.map(smerinke => smerinkeDigits.indexOf(smerinke));
//     const number = parseInt(digitsArr.join(''), 10);
//     return number;
// }

function Login() {
    const [phone, setPhone] = React.useState<string>("");
    const [number, setNumber] = React.useState<number>(0);
    const [isPhone, setIsPhone] = React.useState<Boolean>(false);

    let page = [
        <PhoneNumberPage phone={phone} setNumber={setNumber} setPhone={setPhone} isPhone={isPhone} setIsPhone={setIsPhone} key={0} />,
        <VerificationCodePage phone={phone} setNumber={setNumber} />
    ]

    return (
        <div className='ani-showpage'>
            <ThemeProvider theme={theme}>
                <div className="bg-white h-screen flex justify-center items-center flex-col p-2">
                    <Button onClick={() => setNumber(number === 1 ? 0 : 0)} sx={{ alignSelf: "end", mb: "auto", mt: 1 }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 8.75H4.7875L11.775 1.7625L10 0L0 10L10 20L11.7625 18.2375L4.7875 11.25H20V8.75Z" fill="#323232" />
                        </svg>
                    </Button>
                    <SwitchTransition mode='out-in'>
                        <CSSTransition key={number} classNames='page' timeout={250}>
                            {page[number]}
                        </CSSTransition>
                    </SwitchTransition>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default Login;

interface IPageNumber {
    isPhone: Boolean,
    phone: string,
    setIsPhone: React.Dispatch<React.SetStateAction<Boolean>>,
    setNumber: React.Dispatch<React.SetStateAction<number>>,
    setPhone: React.Dispatch<React.SetStateAction<string>>,
}

const PhoneNumberPage: React.FC<IPageNumber> = ({ setNumber, setPhone, phone, isPhone, setIsPhone }) => {
    const [isError, setIsError] = React.useState<boolean>(false);

    const handleSubmitPhone = (e: React.FormEvent<HTMLFormElement>): void | boolean => {
        e.preventDefault();

        if (isPhone) {
            setNumber(1)
        } else {
            setIsError(true)
        }
    }

    function getChangeValue(e: React.ChangeEvent<HTMLInputElement>): void {
        setPhone(e.target.value);
        setIsError(false)
        setIsPhone(validatePhoneNumber(e.target.value));

    }


    return (
        <>
            <h2 className="text-[58px] text-[#76B947] mb-10">!برنج</h2>
            <form className="p-4 flex justify-center items-start flex-col mb-auto" onSubmit={handleSubmitPhone}>
                <label className='mr-2 text-[13px]' htmlFor="input-with-icon-adornment">
                    ورود با شماره موبایل
                </label>
                <FormControl sx={{ mt: 1, "div": { borderRadius: 50 }, "input": { letterSpacing: 4 } }} className='rounded-[100px]' dir="ltr" variant="outlined">
                    <OutlinedInput
                        error={isError}
                        placeholder="9000000000"
                        type='number'
                        id='phoneNumber'
                        defaultValue={phone}
                        className='rounded-[100px]'
                        onChange={getChangeValue}
                        endAdornment={
                            <InputAdornment position="start">
                                {
                                    isPhone ?
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8.5" cy="8.5" r="8.5" fill="#76B947" />
                                            <path d="M5 8.26667L7.625 12L12 5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                        :
                                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8.5" cy="8.5" r="8.5" fill="#0000" />
                                        </svg>
                                }
                            </InputAdornment>
                        }
                        startAdornment={
                            <InputAdornment position="end">
                                <div className='p-2'>+98</div>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button type='submit' variant='contained' sx={{ borderRadius: 50, mt: 2.4, p: 2, mb: 10 }} fullWidth>تایید</Button>
                <Accordion sx={{ "&::before": { opacity: 0 } }}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography sx={{ display: "flex", alignItems: "center", fontStyle: "normal", fontSize: 13, color: "#424242" }}>
                            <svg width="24" height="24" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6667 6.14667C12.6667 2.48667 9.82667 0 6.66667 0C3.54 0 0.666667 2.43333 0.666667 6.18667C0.266667 6.41333 0 6.84 0 7.33333V8.66667C0 9.4 0.6 10 1.33333 10H2V5.93333C2 3.35333 4.08667 1.26667 6.66667 1.26667C9.24667 1.26667 11.3333 3.35333 11.3333 5.93333V10.6667H6V12H11.3333C12.0667 12 12.6667 11.4 12.6667 10.6667V9.85333C13.06 9.64667 13.3333 9.24 13.3333 8.76V7.22667C13.3333 6.76 13.06 6.35333 12.6667 6.14667Z" fill="black" />
                                <path d="M4.66667 7.33333C5.03486 7.33333 5.33333 7.03486 5.33333 6.66667C5.33333 6.29848 5.03486 6 4.66667 6C4.29848 6 4 6.29848 4 6.66667C4 7.03486 4.29848 7.33333 4.66667 7.33333Z" fill="black" />
                                <path d="M8.66654 7.33333C9.03473 7.33333 9.33321 7.03486 9.33321 6.66667C9.33321 6.29848 9.03473 6 8.66654 6C8.29835 6 7.99988 6.29848 7.99988 6.66667C7.99988 7.03486 8.29835 7.33333 8.66654 7.33333Z" fill="black" />
                                <path d="M10.6667 5.35333C10.3467 3.45333 8.69335 2 6.70002 2C4.68002 2 2.50669 3.67333 2.68002 6.3C4.32669 5.62667 5.56669 4.16 5.92002 2.37333C6.79335 4.12667 8.58669 5.33333 10.6667 5.35333Z" fill="black" />
                            </svg>
                            &nbsp;
                            پشتیبانی
                            &nbsp;
                            <svg width="12" height="12" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.5" d="M4 4L7.4641 0.25H0.535898L4 4Z" fill="black" />
                            </svg>
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <a href='mailto:info@mail.com'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                            </svg>
                                        </ListItemIcon>
                                        <ListItemText sx={{ "span": { fontSize: 12 } }} primary="info@mail.com" />
                                    </ListItemButton>
                                </a>
                                <a href='tel:01144201234'>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                            </svg>
                                        </ListItemIcon>
                                        <ListItemText sx={{ "span": { fontSize: 12 } }} primary="44201234 (011) " />
                                    </ListItemButton>
                                </a>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                                        </svg>
                                    </ListItemIcon>
                                    <ListItemText sx={{ "span": { fontSize: 12 } }} primary="پرسش های متداول" />
                                </ListItemButton>
                            </List>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </form>
        </>
    )
}


interface INumber {
    phone: string,
    setNumber: React.Dispatch<React.SetStateAction<number>>,
}

const VerificationCodePage: React.FC<INumber> = ({ setNumber, phone }) => {
    const [downTime, setDownTime] = React.useState<number>(120);

    let seconds = 120
    function countdown(): any {
        if (seconds > 0) {
            seconds--;
        } else {
            seconds = 0
        }

        return seconds
    }

    React.useEffect(() => {
        document.querySelector("input.vi")?.setAttribute("inputmode", "numeric")

        let time = setInterval(() => {
            setDownTime(countdown());
        }, 1000);

        return () => {
            clearInterval(time);
        }

    }, [])

    return (
        <div className='mb-auto'>
            <div dir='ltr' className='mb-40'>
                <div className='flex justify-center flex-col items-center mb-20'>
                    <h2 className='text-[20px] text-center'>کد ارسال شده به شماره <span className='text-[14px]'>{phone}</span><br /> را اینجا وارد کنید</h2>
                    <span onClick={() => setNumber(0)} className='font-normal text-[13px] mt-5'></span>
                    <span onClick={() => setNumber(0)} className='font-normal text-[13px] mt-5 underline text-blue-500'>شماره تلفن اشتباه است</span>
                </div>
                <VerificationInput length={4} placeholder="" />
                {
                    downTime === 0 ?
                        <p dir="rtl" className='text-[#3232324d] font-normal text-[13px] text-center mr-3 mt-20  underline'>ارسال مجدد کد تایید</p>
                        :
                        <p dir="rtl" className='text-[#3232324d] font-normal text-[13px] text-center mr-3 mt-20'>  تا ارسال مجدد کد تایید
                            {Math.floor(downTime / 60) > 10 ? Math.floor(downTime / 60) : ("0" + Math.floor(downTime / 60)) + ":" + (downTime % 60 < 10 ? "0" + (downTime % 60) : downTime % 60)}</p>
                }
            </div>
        </div>
    )
}