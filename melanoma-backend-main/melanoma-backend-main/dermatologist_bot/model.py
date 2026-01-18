class DermatologistLocator:
    def __init__(self):
        # Tunis dermatologists database - only Tunis!
        self.dermatologists = [
            {"name": "Dr. Leila Ben Ammar", "city": "Tunis", "specialty": "Dermatologie Générale", "phone": "+216 70 000 001", "address": "Centre Urbain Nord, Tunis"},
            {"name": "Dr. Mohamed Trabelsi", "city": "Tunis", "specialty": "Cancer de la Peau", "phone": "+216 70 000 002", "address": "Avenue Habib Bourguiba, Tunis"},
            {"name": "Dr. Salma Abid", "city": "Tunis", "specialty": "Mélanome", "phone": "+216 70 000 003", "address": "Lac de Tunis"},
            {"name": "Dr. Houssem Gara", "city": "Tunis", "specialty": "Dermatologie Chirurgicale", "phone": "+216 70 000 004", "address": "Menzeh 6, Tunis"},
            {"name": "Dr. Amira Chaabouni", "city": "Tunis", "specialty": "Dermatologie Pédiatrique", "phone": "+216 70 000 005", "address": "El Manar, Tunis"},
            {"name": "Dr. Riadh Masmoudi", "city": "Tunis", "specialty": "Dermatologie Esthétique", "phone": "+216 70 000 006", "address": "La Soukra, Tunis"},
        ]
    
    def find_dermatologists(self, specialty=None):
        results = self.dermatologists
        
        if specialty:
            results = [doc for doc in results if specialty.lower() in doc['specialty'].lower()]
        
        return results
    
    def process_message(self, user_message):
        message = user_message.lower()
        
        # Since we only have Tunis, we can simplify
        if 'melanome' in message or 'cancer' in message:
            return self.find_dermatologists(specialty="Mélanome")
        elif 'chirurg' in message:
            return self.find_dermatologists(specialty="Chirurgicale")
        elif 'pédiatri' in message or 'enfant' in message:
            return self.find_dermatologists(specialty="Pédiatrique")
        elif 'esthéti' in message:
            return self.find_dermatologists(specialty="Esthétique")
        elif 'général' in message or 'general' in message:
            return self.find_dermatologists(specialty="Générale")
        else:
            return {
                "response": "Je peux vous aider à trouver un dermatologue à Tunis ! Dites-moi quelle spécialité vous intéresse :",
                "available_specialties": ["Mélanome", "Cancer de la Peau", "Dermatologie Générale", "Dermatologie Chirurgicale", "Dermatologie Pédiatrique", "Dermatologie Esthétique"],
                "all_dermatologists": self.dermatologists
            }