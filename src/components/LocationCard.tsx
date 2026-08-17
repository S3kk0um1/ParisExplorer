import { Text, View } from "react-native";
type LocationCardProps = {
    name: string;
    rating: number;
};

export default function LocationCard(props : LocationCardProps){
    
    return (
        <View>
            <Text>
                {props.name}
            </Text>
            <Text>
                {props.rating}
            </Text>
        </View>

    )
}