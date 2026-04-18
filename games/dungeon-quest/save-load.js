// ═══════════════════════════════════════════════════════════════
// SAVE / LOAD — encryption, file download, file import
// Extracted from index.html
// Dependencies: gameState (runtime global), saveGame (runtime global)
// ═══════════════════════════════════════════════════════════════

        function encryptSave(data) {
            try {
                const jsonStr = JSON.stringify(data);
                const encoded = btoa(encodeURIComponent(jsonStr));
                
                // Add checksum to detect tampering
                const checksum = generateChecksum(jsonStr);
                
                // XOR cipher with key
                let encrypted = '';
                for (let i = 0; i < encoded.length; i++) {
                    encrypted += String.fromCharCode(
                        encoded.charCodeAt(i) ^ SAVE_KEY.charCodeAt(i % SAVE_KEY.length)
                    );
                }
                
                return btoa(JSON.stringify({
                    v: 1, // version
                    d: btoa(encrypted), // data
                    c: checksum // checksum
                }));
            } catch (e) {
                console.error('Encryption failed:', e);
                return null;
            }
        }
        
        function decryptSave(encryptedData) {
            try {
                const wrapper = JSON.parse(atob(encryptedData));
                
                if (wrapper.v !== 1) {
                    throw new Error('Invalid save version');
                }
                
                const encrypted = atob(wrapper.d);
                
                // XOR decipher
                let decoded = '';
                for (let i = 0; i < encrypted.length; i++) {
                    decoded += String.fromCharCode(
                        encrypted.charCodeAt(i) ^ SAVE_KEY.charCodeAt(i % SAVE_KEY.length)
                    );
                }
                
                const jsonStr = decodeURIComponent(atob(decoded));
                
                // Verify checksum
                const calculatedChecksum = generateChecksum(jsonStr);
                if (calculatedChecksum !== wrapper.c) {
                    throw new Error('Save file has been tampered with!');
                }
                
                return JSON.parse(jsonStr);
            } catch (e) {
                console.error('Decryption failed:', e);
                throw new Error('Invalid or corrupted save file');
            }
        }
        
        function generateChecksum(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return hash.toString(36);
        }
        
        function downloadSaveFile() {
            try {
                const snapshot = buildSaveSnapshot();
                if (!snapshot) {
                    alert('No character data to save!');
                    return;
                }
                
                const encrypted = encryptSave(snapshot);
                if (!encrypted) {
                    alert('Failed to encrypt save file!');
                    return;
                }
                
                // Create filename with character name and timestamp
                const timestamp = new Date().toISOString().slice(0, 10);
                const filename = `DungeonQuest_${snapshot.characterName}_${timestamp}.dqsave`;
                
                // Create blob and download
                const blob = new Blob([encrypted], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                alert(`✅ Save file downloaded: ${filename}`);
            } catch (e) {
                console.error('Download failed:', e);
                alert('Failed to download save file!');
            }
        }
        
        function loadFromFile() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.dqsave';
            
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const encryptedData = event.target.result;
                        const data = decryptSave(encryptedData);
                        
                        // Validate the save data
                        if (!data.player || !data.characterId) {
                            throw new Error('Invalid save file structure');
                        }
                        
                        // Save to localStorage
                        const key = `dq_save_${data.characterId}`;
                        localStorage.setItem(key, JSON.stringify(data));
                        
                        // Update character list
                        updateCharacterList(data);
                        
                        alert(`✅ Character "${data.characterName}" loaded successfully!`);
                        
                        // Load the character
                        loadCharacter(data.characterId);
                    } catch (e) {
                        console.error('Load failed:', e);
                        alert('❌ Failed to load save file: ' + e.message);
                    }
                };
                reader.readAsText(file);
            };
            
            input.click();
        }
