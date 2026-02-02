import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View , StyleSheet } from "react-native";
import {Button, Text, TextInput , useTheme} from 'react-native-paper'


export default function  AuthScreen() {
    const theme = useTheme()
    const {SignIn , SignUp} = useAuth()
    const router = useRouter()
    const [isSignUp, setSignUp] = useState<boolean>(true) ;
    const [email, setEmail] = useState<string>("")
    const [password, setpassword] = useState<string>("")
    const [error, setError] = useState<string | null>('')

    const HandelAuth = async()=>{
        if(!email || !password){
            setError('Please Fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('password must be > 6 character ')
            return;
        }
        setError(null);

        if (isSignUp) {
            const error = await SignUp(email, password);
            if (error ) {
                setError(error);
                return ;
            }
        } else {
            const error = await SignIn(email, password );
            if (error) {
                setError(error);
                return ;
            }
        }
        return router.replace('/')
    }
    const HandelSwitchMod = ()=>{
        setSignUp((prev)=> !prev);
    };
    return(
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? 'padding' : "height"}
        style={style.container}
        >
            <View style={style.content}>
                <Text style={style.title} variant="headlineMedium"> {isSignUp ? "Create Account " : "Welcom Back"} </Text>
                <TextInput 
                    style={style.input}
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    mode="outlined"
                    onChangeText={setEmail}
                />

                <TextInput  
                    style={style.input}
                    label="Password"
                    autoCapitalize="none"
                    mode="outlined"
                    secureTextEntry
                    onChangeText={setpassword}
                />
                {error && <Text style={{color : theme.colors.error}}>{error}</Text>}
                <Button 
                    onPress={HandelAuth}
                    style={style.button}
                    mode="contained" 
                >
                    {isSignUp ?
                        "Sign Up" :
                        "Sign In"}
                </Button>

                <Button 
                style={style.SwitchModeButton}
                  mode="text"
                  onPress={HandelSwitchMod}>
                    {
                    isSignUp ? 
                        "Already hav an account ? Sign In" :
                        "Don't have an account ? Sign Up"}
                    </Button>

            </View>
    </KeyboardAvoidingView>
    )
}


const style = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#f5f5f5"
    },
    content : {
        flex : 1,
        padding : 16,
        justifyContent : "center"
    },
    title : {
        textAlign : "center",
        marginBottom : 24
    },
    input : {
        marginBottom : 18
    },
    button : {
        marginTop : 8
    },
    SwitchModeButton : {
        marginTop : 16
    },
    
})