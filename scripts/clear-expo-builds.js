import fs from 'fs';
import path from 'path';

const root = process.cwd();

// Add paths for build folders
const expoDir = path.join(root, '.expo');
const iosDir = path.join(root, 'ios');
const androidDir = path.join(root, 'android');

// Function to delete directory recursively
const deleteDirectory = dirPath => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    console.log(`Deleted ${dirPath}`);
  }
};

// Delete build folders
deleteDirectory(expoDir);
deleteDirectory(iosDir);
deleteDirectory(androidDir);
