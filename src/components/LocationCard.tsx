import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type LocationData = {
  id: number | string,
  title: string,
  description : string,
  eventUrl : string,
  startDate : string,
  endDate : string,
  imageUrl: string,
  address : string,
  isFavorite : boolean,
  toggleFavorite : Function
};

export default function LocationCard({id,title,description,eventUrl,startDate,endDate,imageUrl,address,isFavorite,toggleFavorite} : LocationData){
    const router = useRouter();
    
    return (
        
        <TouchableOpacity style={styles.card} onPress={() =>{ console.log("Card was tapped!");router.push({pathname: "/details",
    params: {id,title,description,eventUrl,startDate,endDate,imageUrl,address}})}}>
            <Image style={styles.image} source={{uri : imageUrl}}>
                
            </Image>
            <View style={styles.infoLocation}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <TouchableOpacity style = {styles.favoriteButton} onPress={()=>toggleFavorite(id)}><Text style={[styles.favoriteIcon,{color: isFavorite?"#DC2626":"#4B5563"}]}>{isFavorite ? '♥' : '♡'}</Text></TouchableOpacity>
            </View>
            
            
        </TouchableOpacity>
    )
    
};

const styles = StyleSheet.create({
    card : {
        
        
        backgroundColor: '#eeeeee',
        elevation: 3,
        marginBottom: 20,
        borderRadius: 25,
        marginHorizontal: 16

    },
    image : {
        width : '100%',
        height : 200,
        borderRadius: 25,
        
    },
    infoLocation:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    title : {
        fontSize :16,
        fontWeight:"600",
        color :"#111827",
        flex:1,
        marginRight:12

    },
    favoriteButton : {
        width : 48,
        height : 48,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24
    },
    favoriteIcon : {
        fontSize : 26
        
    }

})