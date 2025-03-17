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
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

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
  ) {}

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
      alert('Debes estar autenticado para comentar.');
      return;
    }

    await addDoc(collection(this.firestore, 'comments'), {
      blog_id: this.blog.id,
      author_id: user.uid,
      author_name: user.displayName || 'Anónimo',
      content: this.newComment,
      created_at: Timestamp.now(),
      parent_id: null,
    });

    this.newComment = '';
    await this.loadComments(this.blog.id);
  }
}
