import { Image, StyleSheet, Text, View } from "react-native";
type LocationCardProps = {
    name: string;
    rating: number;
    imageUrl : string
};

export default function LocationCard({name,rating,imageUrl} : LocationCardProps){
    
    return (
        
        <View style={styles.card}>
            <Image style={styles.image} source={{uri : imageUrl}}>
                
            </Image>
            <View style={styles.infoLocation}>
                <Text>
                    {name}
                </Text>
                <Text>
                    {rating}
                </Text>
            </View>
            
            
        </View>
    )
    
};

const styles = StyleSheet.create({
    card : {
        
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee',   
        padding: 16,
    },
    image : {
        width : '100%',
        height : 200
    },
    infoLocation:{
        flexDirection: 'row'
    }
})