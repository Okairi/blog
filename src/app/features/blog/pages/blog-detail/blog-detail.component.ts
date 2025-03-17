import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  comments: any[] = [];
  newComment: string = '';
  isLoading: boolean = true; // Estado de carga

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    private auth: Auth
  ) {
    // Guardamos el nombre del usuario al iniciar sesión
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const defaultName = user.email?.split('@')[0] || 'Usuario';
        localStorage.setItem('username', defaultName);
      }
    });
  }

  async ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      await this.loadBlog(blogId);
      await this.loadComments(blogId);
    }
    this.isLoading = false; // Se oculta el loading después de cargar los datos
  }

  async loadBlog(blogId: string) {
    const blogRef = doc(this.firestore, 'blogs', blogId);
    const blogSnap = await getDoc(blogRef);
    if (blogSnap.exists()) {
      this.blog = { id: blogSnap.id, ...blogSnap.data() };
    }
  }

  async loadComments(blogId: string) {
    const commentsRef = collection(this.firestore, 'comments');
    const q = query(commentsRef, where('blog_id', '==', blogId));
    const commentsSnap = await getDocs(q);
    this.comments = commentsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async addComment() {
    if (!this.newComment.trim()) return;

    const user = this.auth.currentUser;
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Error de envio.',
        text: 'Debes estar autenticado para comentar.',
        confirmButtonColor: '#3085d6',
      });

      return;
    }

    // Obtener el nombre desde localStorage
    const username = localStorage.getItem('username') || 'Anónimo';

    await addDoc(collection(this.firestore, 'comments'), {
      blog_id: this.blog.id,
      author_id: user.uid,
      author_name: username,
      content: this.newComment.trim(),
      created_at: Timestamp.now(),
      parent_id: null,
    });

    this.newComment = '';
    await this.loadComments(this.blog.id);
  }
}
